const IEX_API = 'https://api.iextrading.com/1.0/';
let stock_sym = 'aapl',
    date = '20180612'

$.ajax({
   method: 'GET',
   url: IEX_API + `stock/${stock_sym}/chart/date/${date}`,
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
