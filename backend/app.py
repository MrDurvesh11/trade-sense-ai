from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
import json

#import custom function
from monte_carlo import monte_carlo_call 
from stock_analyzer import stock_analyzer
from chat import text_summary

app = Flask(__name__) 
CORS(app)

@app.route('/analyze_stock', methods=['POST'])
def analyze_stock():
    stock_name = request.json['stock_name']
    result = stock_analyzer(stock_name)
    data_str = str(result)

    data_dict  = eval(data_str)
    return data_dict

@app.route('/monte-carlo', methods=['POST'])
def monte_carlo_api():
    stock_name = request.json['stock_name']
    no_of_days = request.json['no_of_days']
    total_investment = request.json['total_investment']
    result = monte_carlo_call(stock_name, no_of_days, total_investment)
    # data_str = result.VaR
    print(result)
    
    return result

@app.route('/chat', methods=['POST'])
def summarize_text():
    text = request.json['text']
    isNew = request.json['isNew']
    response = text_summary(text, isNew)
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True, port=5000)