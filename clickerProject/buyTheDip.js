$(document).ready(function(){
    var symbol='goog';
    var callback = function(data) {
            var price=data.query.results.span[0].content;
            alert('Stock Price: ' + price);
        };

    var url = 'http://query.yahooapis.com/v1/public/yql';
    // this is the lovely YQL query (html encoded) which lets us get the stock price:
    // select * from html where url="http://finance.yahoo.com/q?s=goog" and xpath='//span[@id="yfs_l10_goog"]'
    var data = "q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Ffinance.yahoo.com%2Fq%3Fs%3D" + symbol + "%22%20and%20xpath%3D'%2F%2Fspan%5B%40id%3D%22yfs_l10_" + symbol + "%22%5D'&format=json";
    $.getJSON(url, data, callback);
});
  