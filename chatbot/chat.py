import random
import json
import torch
from model import NeuralNet
from nltkUtils import bag_of_words, tokenize

class ChatBot:
    def __init__(self, intents_file, data_file):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.intents = json.load(open(intents_file))
        self.model = self._load_model(data_file)

    def _load_model(self, data_file):
        data = torch.load(data_file)
        model = NeuralNet(data["input_size"], data["hidden_size"], data["output_size"]).to(self.device)
        model.load_state_dict(data["model_state"])
        model.eval()
        self.all_words = data["all_words"]
        self.tags = data["tags"]
        return model

    def get_response(self, msg):
        sentence = tokenize(msg)
        X = bag_of_words(sentence, self.all_words)
        X = X.reshape(1, X.shape[0])
        X = torch.from_numpy(X).to(self.device)

        output = self.model(X)
        _, predicted = torch.max(output, dim=1)
        tag = self.tags[predicted.item()]

        probs = torch.softmax(output, dim=1)
        prob = probs[0][predicted.item()]

        if prob.item() > 0.75:
            for intent in self.intents["intents"]:
                if tag == intent["tag"]:
                    return random.choice(intent['responses'])
        return "I don't understand..."


if __name__ == "__main__":
    bot = ChatBot("intents.json", "data.pth")
    print("Let's chat! (type 'X' to exit)")
    while True:
        sentence = input("You: ")
        if sentence == "X":
            break
        resp = bot.get_response(sentence)
        print(resp)



