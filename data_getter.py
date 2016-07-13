import csv
import requests
from flask import jsonify

URL = "http://www.nasdaq.com/quotes/nasdaq-100-stocks.aspx?render=download"

def get_data():
    r = requests.get(URL)
    data = r.text
    # RESULTS = {'children': []}

    RESULTS = [
      ["bubble1", [10, 20]],
      ["bubble2", [5, 7]],
      ["bubble3", [6, 6, 10]],
      ["bubble4", [12, 14]],
      ["bubble5", [14, 4]],
      ["bubble6", [15, 5, 10]],
      ["bubble7", [10, 10]],
      ["bubble8", [25, 10]],
      ["bubble9", [10, 25, 10, 10]],
      ["bubble10", [55, 10]],
      ["bubble11", [10, 80, 10, 10]],
      ["bubble12", [50, 50]],
    ]

    print "RESULTS=[%s]" % RESULTS
    # print "jsonify(RESULTS)=[%s]" % jsonify(RESULTS)

    return RESULTS

def get_data2():
    r = requests.get(URL)
    data = r.text
    RESULTS = {'children': []}
    for line in csv.DictReader(data.splitlines(), skipinitialspace=True):
        # if float(line['Nasdaq100_points']) > .5:
            matched = int(float(line['pctchange'])*1000*float(line['Nasdaq100_points']))
            mismatched = 10000*float(line['Nasdaq100_points']) - matched
            RESULTS['children'].append({
                'name': line['Name'],
                'symbol': line['Symbol'],
                'symbol': line['Symbol'],
                'price': line['lastsale'],
                'net_change': line['netchange'],
                'percent_change': line['pctchange'],
                'volume': line['share_volume'],
                'value': line['Nasdaq100_points'],
                'matched_data': [matched, mismatched]
            })
    return RESULTS

def get_data3():
    r = requests.get(URL)
    data = r.text
    RESULTS = {'children': []}
    for line in csv.DictReader(data.splitlines(), skipinitialspace=True):
        if float(line['Nasdaq100_points']) > .5:
            matched = int(float(line['pctchange'])*1000*float(line['Nasdaq100_points']))
            mismatched = 10000*float(line['Nasdaq100_points']) - matched
            RESULTS['children'].append({
                'name': line['Name'],
                'symbol': line['Symbol'],
                'symbol': line['Symbol'],
                'price': line['lastsale'],
                'net_change': line['netchange'],
                'percent_change': line['pctchange'],
                'volume': line['share_volume'],
                'value': line['Nasdaq100_points'],
                'matched_data': [matched, mismatched]
            })
    return RESULTS

def get_data_orig():
    r = requests.get(URL)
    data = r.text
    RESULTS = {'children': []}
    for line in csv.DictReader(data.splitlines(), skipinitialspace=True):
        if float(line['Nasdaq100_points']) > .5:
            RESULTS['children'].append({
                'name': line['Name'],
                'symbol': line['Symbol'],
                'symbol': line['Symbol'],
                'price': line['lastsale'],
                'net_change': line['netchange'],
                'percent_change': line['pctchange'],
                'volume': line['share_volume'],
                'value': line['Nasdaq100_points']
            })
    return RESULTS
