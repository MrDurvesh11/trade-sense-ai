import google.generativeai as genai
from dotenv import load_dotenv
import os
import json
import yfinance as yf

def stock_analyzer(stock_name):
    load_dotenv()
    api_key = os.getenv("GOOGLE_API_KEY")
    
    genai.configure(api_key=api_key)
    
    generation_config = {
        "temperature": 0.9,
        "top_p": 1,
        "top_k": 1,
        "max_output_tokens": 2048,
    }
    safety_settings = [
        {
            "category": "HARM_CATEGORY_HARASSMENT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
            "category": "HARM_CATEGORY_HATE_SPEECH",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
            "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
            "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
    ]
    
    model = genai.GenerativeModel(model_name="gemini-1.0-pro",
                              generation_config=generation_config,
                              safety_settings=safety_settings)

    convo = model.start_chat(history=[])

    convo.send_message("Analyze the stock/index " + stock_name + """ from latest data. give the data in json text format only(do not append json ). give the hold busy sell percent in total of 100.
                       Formate: 
                        {"yfinance_symbol": "",
                        "about_company": "",
                        "companyName": "",
                        "positives": ["", ""],
                        "negatives": ["", "", ""],
                        "latest_news": [{"title": "", "description": ""}, {"title": "", "description": ""}],
                        "hold_recommendation_percent": "",
                        "buy_recommendation_percent": "",
                        "sell_recommendation_percent": "",
                        "buy_reason": "",
                        "sell_reason": "",
                        "hold_reason": "",
                        }
                        Note: dont leave any field empty. If you dont have any data for a field, put an None as String.
                       """)
    
    data = convo.last.text
    
    json_data = json.loads(data)    
    
    stock = yf.Ticker(json_data["yfinance_symbol"])
    
    # appending the data to the json_data (current_price open, volume, market_cap, pe_ratio, 52_week_high, 52_week_low)
    
    json_data["current_price"] = stock.history(period="1d")["Close"].iloc[-1]
    json_data["open"] = stock.history(period="1d")["Open"].iloc[0]
    json_data["volume"] = stock.history(period="1d")["Volume"].iloc[0]
    json_data["market_cap"] = stock.info["marketCap"]
    # json_data["pe_ratio"] = stock.info["trailingPE"]
    # if trailingPE is not available, then None
    if "trailingPE" in stock.info:
        json_data["pe_ratio"] = stock.info["trailingPE"]
    else:
        json_data["pe_ratio"] = "None"
    json_data["52_week_high"] = stock.info["fiftyTwoWeekHigh"]
    json_data["52_week_low"] = stock.info["fiftyTwoWeekLow"]
    
    # result = json.dumps(json_data, indent=4)
    
    return json_data