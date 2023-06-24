import json
import numpy as np
import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
from nltkUtils import tokenize, stem, bag_of_words
from model import NeuralNet
 
class ChatTrainer:
    def __init__(self, intents_file, model_class, batch_size, hidden_size, num_epochs, lr, ignore_words, data_file):
        self.intents_file = intents_file
        self.model_class = model_class
        self.batch_size = batch_size
        self.hidden_size = hidden_size
        self.num_epochs = num_epochs
        self.lr = lr
        self.ignore_words = ignore_words
        self.data_file = data_file
        self.all_words = []
        self.tags = []
        self.xy = []
    
    def load_data(self):
        with open(self.intents_file, 'r') as f:
            intents = json.load(f)
        for intent in intents['intents']:
            tag = intent['tag']
            self.tags.append(tag)
            for pattern in intent['patterns']:
                w = tokenize(pattern)
                self.all_words.extend(w)
                self.xy.append((w, tag))
        self.all_words = [stem(w) for w in self.all_words if w not in self.ignore_words]
        self.all_words = sorted(set(self.all_words))
        self.tags = sorted(set(self.tags))
    
    def build_dataset(self):
        X_train = []
        Y_train = []
        for (pattern_sentence, tag) in self.xy:
            bag = bag_of_words(pattern_sentence, self.all_words)
            X_train.append(bag)
            label = self.tags.index(tag)
            Y_train.append(label)
        self.X_train = np.array(X_train)
        self.Y_train = np.array(Y_train)
        self.input_size = len(X_train[0])
        self.output_size = len(self.tags)
 
    def train(self):
        class ChatDataset(Dataset):
            def __init__(self,X_train,Y_train):
                self.n_samples = len(X_train)
                self.x_data = X_train
                self.y_data = Y_train
 
            def __getitem__(self, index):
                return self.x_data[index], self.y_data[index]
 
            def __len__(self):
                return self.n_samples
        
        dataset = ChatDataset(self.X_train, self.Y_train)
        train_loader = DataLoader(dataset=dataset, batch_size=self.batch_size, shuffle=True, num_workers = 0)
        device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        model = self.model_class(self.input_size, self.hidden_size, self.output_size).to(device)
 
        criterion = nn.CrossEntropyLoss()
        optimizer = torch.optim.Adam(model.parameters(), lr=self.lr)
 
        for epoch in range(self.num_epochs):
            for (words, labels) in train_loader:
                words = words.to(device)
                labels = labels.to(device)
                outputs = model(words)
                loss = criterion(outputs, labels)
 
                optimizer.zero_grad()
                loss.backward()
                optimizer.step()
 
            if (epoch + 1) % 100 == 0:
                print(f'epoch [{epoch+1}/{self.num_epochs}], loss={loss.item():.4f}')
 
        print(f'final loss, loss={loss.item():.4f}')
 
        data = {
            "model_state": model.state_dict(),
            "input_size": self.input_size,
            "output_size": self.output_size,
            "hidden_size": self.hidden_size,
            "all_words": self.all_words,
            "tags": self.tags
        }
        torch.save(data, self.data_file) 
        print(f'training complete, file saved to {self.data_file}')
 
 
trainer = ChatTrainer('intents.json', NeuralNet, 32, 128, 1000, 0.001, ['?', '!', '.', ','], 'data.pth')
trainer.load_data()
trainer.build_dataset()
trainer.train()