import numpy as np
import pandas as pd
import datetime as dt
import yfinance as yf
from scipy.stats import norm

def monte_carlo_call(stock_name, no_of_days, total_investment):
    years = 15

    endDate = dt.datetime.now()
    startDate = endDate - dt.timedelta(days = 365*years)

    ### Create a list of tickers
    tickers = [stock_name]
    adj_close_df = pd.DataFrame()

    for ticker in tickers:
        data = yf.download(ticker, start = startDate, end = endDate)
        adj_close_df[ticker] = data['Adj Close']

    ### Calculate the daily log returns and drop any NAs
    log_returns = np.log(adj_close_df/adj_close_df.shift(1))
    log_returns  = log_returns.dropna()

    ### Create a function that will be used to calculate portfolio expected return
    ###We are assuming that future returns are based on past returns, which is not a reliable assumption.
    def expected_return(weights, log_returns):
        return np.sum(log_returns.mean()*weights)

    ### Create a function that will be used to calculate portfolio standard deviation
    def standard_deviation (weights, cov_matrix):
        variance = weights.T @ cov_matrix @ weights
        return np.sqrt(variance)

    cov_matrix = log_returns.cov()
    
    portfolio_value = total_investment
    weights = np.array([1/len(tickers)]*len(tickers))
    portfolio_expected_return = expected_return(weights, log_returns)
    portfolio_std_dev = standard_deviation (weights, cov_matrix)
    
    def random_z_score():
        return np.random.normal(0, 1)

    days = no_of_days

    def scenario_gain_loss(portfolio_value, portfolio_std_dev, z_score, days):
        return portfolio_value * portfolio_expected_return * days + portfolio_value * portfolio_std_dev * z_score * np.sqrt(days)

    simulations = 10000
    scenarioReturn = []

    for i in range(simulations):
        z_score = random_z_score()
        scenarioReturn.append(scenario_gain_loss(portfolio_value, portfolio_std_dev, z_score, days))    

    confidence_interval = 0.95
    VaR = -np.percentile(scenarioReturn, 100 * (1 - confidence_interval))

    # convert VaR to json
    VaR = {"VaR": VaR}


    return VaR