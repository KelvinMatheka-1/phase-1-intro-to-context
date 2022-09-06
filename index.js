const createEmployeeRecord = function(row){
  return {
      firstName: row[0],
      familyName: row[1],
      title: row[2],
      payPerHour: row[3],
      timeInEvents: [],
      timeOutEvents: []
  }}
const createEmployeeRecords = function(employeeRowData) {
  return employeeRowData.map(function(row){
  return createEmployeeRecord(row)
  })
}
const createTimeInEvent = function(employee, dateStamp){
  const [date, hour] = dateStamp.split(' ')

  employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date,
  })

  return employee
}
const createTimeOutEvent = function(employee, dateStamp){
  const [date, hour] = dateStamp.split(' ')

  employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date,
  })

  return employee
}
const hoursWorkedOnDate = function(employee, seekDate){
  const inEvent = employee.timeInEvents.find(function(e){
      return e.date === seekDate
  })

  let outEvent = employee.timeOutEvents.find(function(e){
      return e.date === seekDate
  })

  return (outEvent.hour - inEvent.hour) / 100
}
const wagesEarnedOnDate = function(employee, seekDate){
  const wage = hoursWorkedOnDate(employee, seekDate)
      * employee.payPerHour
  return parseFloat(wage.toString())
}
const allWagesFor = function(employee){
  const allowedDates = employee.timeInEvents.map(function(e){
      return e.date
  })

  const payableAmount = allowedDates.reduce(function(memo, d){
      return memo + wagesEarnedOnDate(employee, d) }, 0)
  return payableAmount
}
const calculatePayroll = function(arrayOfRecords){
  return arrayOfRecords.reduce(function(memo, records){
      return memo + allWagesFor(records)
  }, 0)
}