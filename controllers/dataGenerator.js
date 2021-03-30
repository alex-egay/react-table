const errorHandler = require('../routes/utils/errorHandler');


const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

const randomInteger = () => {
  return (Math.random() - .5) * 2
}
const getSum = (array) => (
    array.reduce(function (a, b) {
      return (a + b)
    })
)

module.exports.getData = async (req, res) => {
  const applications = [];

  const createValue = () => {
    for (let key of number) {
      let object = {
        entity: `entity${key}`,
        value1: randomInteger(),
        value2: randomInteger(),
        value3: randomInteger(),
        value4: randomInteger(),
        value5: randomInteger(),
        value6: randomInteger(),
        value7: randomInteger(),
        value8: randomInteger(),
        value9: randomInteger(),
      }
      let array = Object.values(object).slice(1, 10)
      let min = Math.min.apply(null, array)
      let max = Math.max.apply(null, array)
      let sum = getSum(array)
      let avg = sum / 9
      applications.push({
        ...object,
        min,
        max,
        sum,
        avg
      })
    }
  }
  try {
    await createValue()
    await res.status(200).json(applications)
  } catch (e) {
    errorHandler(res, e)
  }
};
