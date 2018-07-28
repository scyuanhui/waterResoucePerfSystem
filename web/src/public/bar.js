/**
 * Created by Lenovo on 2018/7/28.
 */
import echarts from 'echarts';

export function setHomeBar(o){
    const e = echarts.init(document.getElementById(o.id));
    const option = {
        title:{text:o.title},
        color: o.color,
        tooltip : {
            trigger: 'axis',
            axisPointer : {
                type : 'shadow'
            }
        },
        legend: {
            data:[o.title],
            x:'right'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : o.xName
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:o.title,
                type:'bar',
                data:o.data
            }
        ]
    };
    e.setOption(option);
}
