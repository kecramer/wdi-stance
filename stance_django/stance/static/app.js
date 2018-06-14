const IEX_API = 'https://api.iextrading.com/1.0/';
let stock_sym = 'aapl',
    date = '20180614';

const renderGraph = (symbol, date) => {
   $.ajax({
      method: 'GET',
      url: IEX_API + `stock/${symbol}/chart/date/${date}`,
      success: (resp) => {
         date_formatted = date.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
         for(let i = 0; i < resp.length; i++) {
            resp[i].minute = new Date(`${date_formatted}T${resp[i].minute}`)
            resp[i].marketAverage = +resp[i].marketAverage
         }

         const WIDTH = 1000,
               HEIGHT = 600,
               MARGINS = {
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 50
               };

         let svg = d3.select('svg')
            .attr('width', WIDTH)
            .attr('height', HEIGHT);

         svg.selectAll('*')
            .remove();

         var x = d3.scaleTime().rangeRound([0, WIDTH]);
         var y = d3.scaleLinear().rangeRound([HEIGHT - MARGINS.top - MARGINS.bottom, 0]);

         var line = d3.line()
            .x(function(d) { return x(+d.minute)})
            .y(function(d) { return y(+d.marketAverage)})
            x.domain(d3.extent(resp, function(d) { return +d.minute }));
            y.domain(d3.extent(resp, function(d) { return +d.marketAverage }));

         var g = svg.append("g")
            .attr("transform",
               "translate(" + MARGINS.left + "," + MARGINS.top + ")" //Margin left, Margin top
            );

         g.append("g")
            .attr("transform", "translate(0," + (HEIGHT - MARGINS.top - MARGINS.bottom) + ")")
            .call(d3.axisBottom(x))
            .select(".domain")
            .remove();

         g.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Price ($)");

         g.append("path")
            .datum(resp)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line);
      }
   });
}

$(document).ready(function (){
   renderGraph(stock_sym, date);

   if ($("#stock_list").length == 0 && $("stock_list").text().length > 0) {
      return;
   }

   $('.sortable').sortable()
   $('.sortable').disableSelection()

   let stocks_list = $('#stock_list').eq(0).text().substring(0, $('#stock_list').eq(0).text().length-1)

   $('.ticker_data_set').on('click', (e) => {
      renderGraph($(e.currentTarget).data('stock-symbol'), date);
   });

   $.ajax({
      method: 'GET',
      url: `https://api.iextrading.com/1.0/stock/market/batch?types=quote&symbols=${stocks_list}`,
      success: function(resp){
         for (let symbol in resp) {
            if (resp.hasOwnProperty(symbol)) {
               let stockDiv = $(`*[data-stock-symbol="${resp[symbol].quote.symbol}"]`)
               let curPrice = stockDiv.children(`.curPrice`)
               let pctChange = stockDiv.children(`.pctChange`)
               curPrice.text(resp[symbol].quote.latestPrice)
               pctChange.text(resp[symbol].quote.changePercent)
               if (resp[symbol].quote.changePercent >= 0) {
                  pctChange.addClass("gain")
               } else {
                  pctChange.addClass("loss")
               }
            }
         }
      }
   })

})
