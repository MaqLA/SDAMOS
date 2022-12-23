// year-month-date
exports.todayDashDate = function(){
    const today = new Date();
    
    let date = ("0" + today.getDate()).slice(-2);
    let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let year = today.getFullYear();
    return year+"-"+month+"-"+date; 
};

// day, month date, year
exports.todaySlashDate = function(){
    const today = new Date();

    const options = {
        weekday: 'long', month: 'long', day: 'numeric'
    }
    return today.toLocaleDateString("en-US",options);
};