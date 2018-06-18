const IEX_API = 'https://api.iextrading.com/1.0/';
let stock_sym = 'aapl',
    today = new Date(),
    date = '' + today.getFullYear() + (today.getMonth() < 10 ? '0' : '') + (today.getMonth() + 1) + (today.getDate() < 10 ? '0' : '') + today.getDate(),
    graph_data = [];

const getGraph = (symbol, date, url, value, time) => {
   $.ajax({
      method: 'GET',
      url: IEX_API + url,
      success: (resp) => {
         graph_data = [];
         date_formatted = date.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
         for(let i = 0; i < resp.length; i++) {
            if(resp[i].marketAverage <= 0) {
              resp.splice(i, 1);
              continue;
            }
            data_point = {time: (time === 'minute' ? new Date(`${date_formatted}T${resp[i][time]}`) : new Date(`${resp[i][time]}`)),
                          value: +resp[i][value]
                         }
            graph_data.push(data_point);
         }
         renderGraph(graph_data);
      }
   });
}



const renderGraph = (data) => {
   let width = $(window).width() / (100/60);
   if ($(window).width() <= 950){
      width = $(window).width() - 32;
   }
   const WIDTH = width,
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
      .x(function(d) { return x(+d.time)})
      .y(function(d) { return y(+d.value)})
      x.domain(d3.extent(data, function(d) { return +d.time }));
      y.domain(d3.extent(data, function(d) { return +d.value }));


   var g = svg.append("g")
      .attr("transform",
         "translate(" + MARGINS.left + "," + MARGINS.top + ")" //Margin left, Margin top
      );

   var div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

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
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line)
      .on("mouseover", function(d) {
         div.transition()
            .duration(200)
            .style("opacity", .9)
         div .html('$' + (y.invert(d3.mouse(this)[1])).toFixed(2))
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
         })
      .on("mouseout", function(d) {
         div.transition()
            .duration(500)
            .style("opacity", 0);
      });
}

$(document).ready(function (){
   getGraph(stock_sym, date, `stock/${stock_sym}/chart/date/${date}`, 'marketAverage', 'minute');

   if ($("#stock_list").length == 0 && $("stock_list").text().length > 0) {
      return;
   }

   $('.sortable').sortable()
   $('.sortable').disableSelection()

   let stocks_list = $('#stock_list').eq(0).text().substring(0, $('#stock_list').eq(0).text().length-1)

   $('.ticker_data_set').on('click', (e) => {
      stock_sym = $(e.currentTarget).data('stock-symbol')
      getGraph($(e.currentTarget).data('stock-symbol'), date, `stock/${$(e.currentTarget).data('stock-symbol')}/chart/date/${date}`, 'marketAverage', 'minute');
      $('.ticker_data_set').removeClass('displayed')
      $(e.currentTarget).addClass('displayed');
   });

   $('.adjust-chart').on('click', (e) => {
      let timeframe = $(e.currentTarget).text()
      getGraph(stock_sym, date, `stock/${stock_sym}/chart/${timeframe}/${date}`, 'close', 'date')
   })

   // https://api.iextrading.com/1.0/stock/aapl/chart/3m

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
               pctChange.text(resp[symbol].quote.changePercent * 100)
               if (resp[symbol].quote.changePercent >= 0) {
                  pctChange.addClass("gain")
               } else {
                  pctChange.addClass("loss")
               }
            }
         }
      }
   })

   $(window).on('resize', (e) => {
      renderGraph(graph_data);
   })
})
