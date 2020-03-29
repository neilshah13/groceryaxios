import {Bar} from 'vue-chartjs'
import axios from 'axios'

export default{
    extends:Bar,
    data: () => ({
        results:[],
        chartdata: {
          //labels:['2020-3-05',4,5,6],
          labels:[],
          datasets: [
            {
              label: 'Last updated on: ',
               data:[],
              //backgroundColor:['aqua','lightgreen','red','orange'],
              borderWidth:0.5,
              borderColor:"black",
              backgroundColor:'lightblue',
              fill:false
            }
          ]
          
        },
        options: {
            title:{
                display:true,
                text:'Covid 19 Cases -- US',
                fontColor:'Black',
                fontSize:15

            },
            legend:{
                position:'top'
            },
            layout:{
                padding:{
                    left: 5,
                    right: 0,
                    top: 0,
                    bottom: 5
                }
            },
            scales:{
                yAxes:[{
                    ticks:{
                        min:0
                    }

                }]
            }
          
        }
      }),
    methods:{
    
    fetchData : function(){
        axios.get('https://covid19.soficoop.com/country/us').then(response=>{
        this.results=response.data.snapshots[response.data.snapshots.length -1]
        console.log(response.data.snapshots[response.data.snapshots.length -1])
        //console.log(this.results)
        
        for(let key in this.results){
            if (key != "timestamp"){
                this.chartdata.datasets[0].data.push(this.results[key])
                this.chartdata.labels.push(key+'')
            }
            else{
                this.chartdata.datasets[0].label += this.results[key].substring(0,10)
            }
        }
        this.renderChart(this.chartdata,this.options)
            
    })
    
    }
    
    },
     mounted(){
        //console.log('Do I come here')
        this.fetchData()
        
     }

    
    
    
}