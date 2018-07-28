/**
 * Created by Lenovo on 2018/7/28.
 */
import echarts from 'echarts';

export function setEchartPie(o){
    const e = echarts.init(document.getElementById(o.id));
    const option = {
        color:o.color,
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
            {
                name:o.name,
                type:'pie',
                radius: ['55%', '75%'],
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    }
                },
                data:o.data
            }
        ]
    };
    e.setOption(option);
}


