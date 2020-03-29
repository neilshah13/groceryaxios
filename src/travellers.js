import { Bar } from 'vue-chartjs'
import axios from 'axios'

export default {
    extends: Bar,
    data: () => ({
        results: [],
        chartdata: {
            labels: [],
            datasets: [
                {
                    label: '2016',
                    data: [],
                    backgroundColor: 'lightgreen',
                    borderWidth: 0.5,
                    borderColor: "black",
                    //backgroundColor:'cyan',
                    fill: false
                }
            ]

        },
        options: {
            title:{
                display:true,
                text:'Travellers in Singapore',
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
    methods: {

        fetchData: function () {
            axios.get('https://data.gov.sg/api/action/datastore_search?resource_id=552b8662-3cbc-48c0-9fbb-abdc07fb377a').then(response => {
                this.results = response.data.result.records.slice(-4)
                //console.log(response.data.result.records.slice(-4))
                //console.log(this.results)
                for (let year in this.results) {
                    /*
                    for (let key in year) {
                        this.chartdata.datasets[0].data.push(year[key])
                        this.chartdata.labels.push(key + '')

                    }*/
                    var data = this.results[year]
                    //console.log(data)
                    this.chartdata.datasets[0].data.push(parseInt(data["average_ridership"]))
                    this.chartdata.labels.push(data["type_of_public_transport"] + '')
                }
                this.renderChart(this.chartdata, this.options)

            })

        }

    },
    mounted() {
        //console.log('Do I come here')
        this.fetchData()

    }




}