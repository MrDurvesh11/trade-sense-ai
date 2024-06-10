import yfinance as yf
import numpy as np
import pandas as pd
import datetime as dt
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense

# Function to fetch historical stock price data
def get_historical_data(symbol, start_date, end_date):
    stock_data = yf.download(symbol, start=start_date, end=end_date)
    return stock_data

# Function to preprocess data for LSTM
def preprocess_data(data):
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(data)  # No need to reshape the data
    return scaled_data, scaler

# Function to create LSTM model
def create_lstm_model(input_shape):
    model = Sequential()
    model.add(LSTM(units=50, return_sequences=True, input_shape=input_shape))
    model.add(LSTM(units=50, return_sequences=False))
    model.add(Dense(units=1))
    model.compile(optimizer='adam', loss='mean_squared_error')
    return model

# Function to train LSTM model
def train_lstm_model(model, X_train, y_train, epochs=60, batch_size=32):
    model.fit(X_train, y_train, epochs=epochs, batch_size=batch_size)

# Function to predict future prices using LSTM model
# def predict_future_prices(model, data, scaler, window_size, future_steps):
#     inputs = data[len(data) - window_size:]
#     inputs = scaler.transform(inputs.reshape(-1, 1))  # Reshape the inputs
#     X_test = []
#     for i in range(window_size, len(inputs)):
#         X_test.append(inputs[i-window_size:i, 0])
#     X_test = np.array(X_test)
#     X_test = np.reshape(X_test, (X_test.shape[0], X_test.shape[1], 1))
#     predicted_prices = model.predict(X_test)
#     predicted_prices = scaler.inverse_transform(predicted_prices)
#     return predicted_prices[-future_steps:]

# Function to perform Monte Carlo simulation for risk analysis
def monte_carlo_simulation(stock_prices, initial_investment, num_simulations=1000, num_days=252):
    returns = (stock_prices[1:] - stock_prices[:-1]) / stock_prices[:-1]
    daily_mean_return = np.mean(returns)
    daily_std_dev = np.std(returns)

    simulation_results = []

    for i in range(num_simulations):
        daily_returns = np.random.normal(daily_mean_return, daily_std_dev, num_days)
        price_simulation = [initial_investment]

        for j in range(num_days):
            price_simulation.append(price_simulation[-1] * (1 + daily_returns[j]))

        simulation_results.append(price_simulation)

    return simulation_results

# Function to predict future prices using LSTM model
def predict_future_prices(model, data, scaler, window_size, future_steps):
    inputs = data[len(data) - window_size:]
    inputs = scaler.transform(inputs.reshape(-1, 1))  # Reshape the inputs

    X_test = []
    for i in range(window_size, len(inputs)):
        X_test.append(inputs[i-window_size:i, 0])

    if not X_test:  # Check if X_test is empty
        return np.array([])  # Return empty array if no data points for prediction

    X_test = np.array(X_test)
    X_test = np.reshape(X_test, (X_test.shape[0], X_test.shape[1], 1))

    predicted_prices = model.predict(X_test)
    predicted_prices = scaler.inverse_transform(predicted_prices)
    return predicted_prices[-future_steps:]

# Main function for algorithmic trading
# Main function for algorithmic trading
def algorithmic_trading(stock_symbol, risk_amount):
    # Define parameters
    start_date = '2020-01-01'
    end_date = '2022-12-31'
    window_size = 60
    future_steps = 10

    # Fetch historical data including OHLCV
    historical_data = get_historical_data(stock_symbol, start_date, end_date)

    # Filter only Close prices for analysis
    close_prices = historical_data['Close'].values

    # Preprocess data for LSTM
    scaled_data, scaler = preprocess_data(close_prices)

    # Split data into train and test sets
    train_data = scaled_data[:int(len(scaled_data)*0.8)]
    test_data = scaled_data[int(len(scaled_data)*0.8):]

    # Prepare training data for LSTM
    X_train, y_train = [], []
    for i in range(window_size, len(train_data)):
        X_train.append(train_data[i-window_size:i])
        y_train.append(train_data[i])
    X_train, y_train = np.array(X_train), np.array(y_train)

    # Reshape the input data for LSTM
    X_train = np.reshape(X_train, (X_train.shape[0], X_train.shape[1], 1))

    # Create and train LSTM model
    model = create_lstm_model((X_train.shape[1], 1))
    train_lstm_model(model, X_train, y_train)

    # Predict future prices using LSTM
    future_prices = predict_future_prices(model, scaled_data, scaler, window_size, future_steps)

    if not future_prices.any():
        print("Insufficient data for prediction")
        return [], [], "Hold"

    # Perform Monte Carlo simulation for risk analysis
    monte_carlo_returns = monte_carlo_simulation(close_prices, risk_amount)

    # Decision rule: Buy if predicted prices are expected to increase and risk is acceptable
    if future_prices[-1] > future_prices[0] and np.mean(monte_carlo_returns) > 0:
        decision = "Buy"
    # Decision rule: Sell if predicted prices are expected to decrease or if risk is too high
    else:
        decision = "Sell"

    return future_prices, monte_carlo_returns, decisionCI
# Example usage
if __name__ == "__main__":
    # Take input from user
    stock_symbol = input("Enter the stock symbol: ")
    risk_amount = float(input("Enter the risk amount: "))

    # Perform algorithmic trading
    future_prices, monte_carlo_returns, decision = algorithmic_trading(stock_symbol, risk_amount)

    print("Predicted future prices:")
    print(future_prices)

    print("Monte Carlo returns:")
    print(monte_carlo_returns)

    print("Decision:", decision)
