
$(document).ready(function (){

   $('.about-us').on('click', function(){
      $('.about-welcome').hide();
      var x = $(this);
      let person = $(this).data();
      person = person.us;
      $('.icon').empty();
      findFounder(person);
      $('.chart-growth').addClass('visible');
      $('.chart-time').addClass('visible');
   });

}); // end of document.ready

function findFounder(x) {
   if (x == 'kevin'){
      $('.icon').append(`${founders.kevin}`);
   } else if (x == 'aaron') {
      $('.icon').append(`${founders.aaron}`);
   } else if (x == 'sharon'){
      $('.icon').append(`${founders.sharon}`);
   }
}

let width = $(window).width() / (100/55);
let height = $(window).height() / (1.6);

founders = {
   kevin: `<h2 class="graph-name k-color">Kevin Cramer</h2>
            <svg version="1.1"
               xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;" i:viewOrigin="-12 -88" i:rulerOrigin="12 488" i:pageBounds="-12 -88 588 -488"
               xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
               x="0px" y="0px" width="${width}" height="${height}" viewBox="0 0 600 400" enable-background="new 0 0 600 400" xml:space="preserve">
                  <g id="steady" i:layer="yes" i:dimmedPercent="50" i:rgbTrio="#4F00FFFF4F00">
                  	<polyline i:knockout="Off" fill="none" stroke="#ff5a1c" stroke-width="4" stroke-linecap="round" stroke-miterlimit="10" points="
                  		21.104,377.081 47.226,377.114 47.23,361.583 75.857,361.391 75.683,343.512 106.929,343.413 106.962,323.646 141.775,323.659
                  		141.723,301.569 171.738,301.688 171.899,282.403 201.035,282.377 201.152,263.824 237.094,263.735 237.74,238.678
                  		265.281,238.655 265.539,221.022 294.578,221.121 294.669,202.521 326.095,202.7 325.93,182.665 355.17,182.503 355.077,164.152
                  		387.353,164.304 387.395,143.626 412.21,143.663 412.37,127.763 439.064,127.905 439.078,110.801 464.589,110.815 464.686,94.538
                  		492.109,94.392 492.092,77.132 521.302,77.08 521.399,60.423 549.711,60.212 549.882,42.333 576.018,42.235 576.077,24.599 "/>
                  </g>
            </svg>`,
   aaron: `<h2 class="graph-name a-color">Aaron Horowitz</h2>
               <svg version="1.1"
               xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;" i:viewOrigin="-12 -88" i:rulerOrigin="12 488" i:pageBounds="-12 -88 588 -488"
               xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
               x="0px" y="0px" width="${width}" height="${height}" viewBox="0 0 600 400" enable-background="new 0 0 600 400" xml:space="preserve">
                  <g id="volitile2_copy" i:layer="yes" i:dimmedPercent="50" i:rgbTrio="#4F00FFFF4F00">
                  	<polyline i:knockout="Off" fill="none" stroke="#64d84b" stroke-width="4" stroke-linecap="round" stroke-miterlimit="10" points="
                  		21.104,377.081 44.443,329.195 65,353 93.116,302.646 111.699,323.885 140.018,261.054 166.871,314.15 199.987,200 218.78,285.834
                  		249.753,230.081 267.452,295.568 296,166 312,255 330.284,197.337 350.637,265.478 378.957,165.479 394.886,216.807
                  		428.515,140.701 447.983,196.453 471.877,98.223 493,147 510.815,53.975 530,97 545,43 559,72 576.077,24.599 	"/>
                  </g>
            </svg>`,
      sharon: `<h2 class="graph-name s-color">Sharon Paz</h2>
                 <svg version="1.1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;" i:viewOrigin="-12 -88" i:rulerOrigin="12 488" i:pageBounds="-12 -88 588 -488" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
                 x="0px" y="0px" width="${width}" height="${height}" viewBox="0 0 600 400" enable-background="new 0 0 600 400" xml:space="preserve">
                    <g id="swirly" i:layer="yes" i:dimmedPercent="50" i:rgbTrio="#4F00FFFF4F00">
                    	<path i:knockout="Off" fill="none" stroke="#9f71e9" stroke-width="4" stroke-linecap="round" stroke-miterlimit="10" d="
                    		M21.104,377.081c7.294-8.445,15.413-24.043,28.261-24.174c7.508-0.077,10.351,4.592,14.587,9.348
                    		c23.414,26.279,51.433-16.562,43.205-40.36c-3.231-9.346-14.169-25.286-24.482-27.784c-7.609-1.843-14.648,4.165-11.81,12.553
                    		c2.611,7.72,17.188,10.298,24.128,10.223c10.173-0.109,15.988-6.03,20.091-15.107c7.964-17.619-2.316-42.703,24.425-43.37
                    		c18.621-0.465,31.264,10.836,35.282,28.503c2.87,12.62-2.797,25.344-12.61,33.269c-7.445,6.012-14.598,7.796-14.554,18.886
                    		c0.064,16.312,13.885,19.588,26.918,13.988c16.581-7.123,23.03-23.139,21.817-39.892c-1.067-14.744-4.579-39.72,9.83-49.696
                    		c4.934-3.417,9.502-1.688,15.252-2.412c13.824-1.741,21.38-14.758,22.817-27.084c1.298-11.143,0.979-23.964,16.058-22.492
                    		c20.938,2.044,30.11,38.407,30.625,54.978c0.278,8.92-1.617,24.905-14.41,18.215c-12.13-6.344-6.499-28.77,1.307-36.374
                    		c8.93-8.698,20.937-9.579,32.836-9.363c16.83,0.306,22.98,17.288,27.949,30.021c5.315,13.621,18.774,14.23,31.454,15.655
                    		c15.783,1.774,26.274-3.265,31.048-19.2c5.621-18.768,3.719-39.775-3.387-57.897c-7.652-19.515-33.96-6.37-23.794,9.378
                    		c3.476,5.386,15.601,4.889,21.64,4.94c9.457,0.082,18.441-4.103,24.64-11.266c7.856-9.079,5.646-23.625,0.072-33.597
                    		c-6.414-11.476-13.543-11.444-13.016,2.72c0.521,14.008,11.951,29.336,17.821,42.398c4.998,11.12,13.1,23.173,26.479,23.061
                    		c22.101-0.186,0.507-23.912-13.221-15.68c-7.603,4.56-7.57,25.97-6.392,33.551c2.232,14.362,14.776,18.791,28.647,16.741
                    		c40.823-6.033,41.301-60.54,28.888-89.412c-4.121-9.583-18.252-37.717-32.6-24.719c-3.362,3.046-5.816,11.747-3.818,15.945
                    		c2.927,6.149,14.099,5.713,20.86,3.499c20.926-6.853,13.696-30.207,18.27-46.11c4.222-14.682,22.754-3.343,33.525-9.031
                    		c12.987-6.857,10.841-21.775,5.639-33.27c-2.934-6.482-7.959-21.04-15.19-24.031c-10.728-4.438-16.03,5.421-16.923,14.082
                    		c-0.934,9.048-0.459,13.04,9.155,14.917c7.759,1.515,15.491-0.101,20.796-6.006c5.829-6.488,6.738-15.247,7.493-23.554
                    		c0.372-4.099,2.76-13.744-2.116-16.115c-7.241-3.521-9.977,6.373-4.654,10.527c4.592,3.584,12.411,6.29,18.256,5.213
                    		c15.261-2.812,24.985-34.856,27.877-47.094"/>
                    </g>
              </svg>`
};
