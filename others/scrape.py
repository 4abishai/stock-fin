import yfinance as yf
import pandas as pd
import json

# List of ticker symbols for 10 different companies
ticker_symbols = [
    "GOOGL", "AAPL", "MSFT", "AMZN", "TSLA", 
    "META", "NFLX", "NVDA", "INTC", "IBM"
]

# Define the period
period = "2y"  # Last 2 years

# Loop over the ticker symbols and fetch the data
for ticker_symbol in ticker_symbols:
    # Fetch the data
    data = yf.download(ticker_symbol, period=period)

    # Convert the index to milliseconds since epoch
    data['timestamp'] = (data.index.astype(int) // 10**6)

    # Select required columns and reorder them
    data = data[['timestamp', 'Open', 'High', 'Low', 'Close']]
    data.columns = ['timestamp', 'open', 'high', 'low', 'close']

    # Limit values to 2 decimal places
    data = data.round({'open': 2, 'high': 2, 'low': 2, 'close': 2})

    # Convert the data to a list of lists
    data_list = data.values.tolist()

    # Define the file path
    file_path = f"/home/abishai/Documents/Codes/Projects/ZerodhaGraphs/others/{ticker_symbol.lower()}.json"
    
    # Save to JSON
    with open(file_path, 'w') as json_file:
        json.dump(data_list, json_file)

    print(f"File saved for {ticker_symbol}")
