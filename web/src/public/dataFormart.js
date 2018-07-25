export default function formatDate(dateStr,reg) {
    if(!dateStr){
        return;
    }
    var _data = new Date(dateStr);
    var year = _data.getFullYear();
    var month = setLen(_data.getMonth() + 1);
    var date = setLen(_data.getDate());
    var hour = setLen(_data.getHours());
    var minute = setLen(_data.getMinutes());
    var second = setLen(_data.getSeconds());
    var _reg = reg ? reg : '/';
    return {
        'YEAR':year,
        'MONTH':month,
        'DATE':date,
        'YMD':year + _reg + month + _reg + date,
        'HMS':hour + ":" + minute + ":" + second,
        'YMD_HMS':year + _reg + month + _reg + date + " " + hour + ":" + minute + ":" + second
    };
}
function setLen(str){
    str = str.toString().length < 2 ? 0 + str.toString() : str;
    return str;
}
