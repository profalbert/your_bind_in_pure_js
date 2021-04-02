const person = {
  name: 'Albert',
}

// const info = () => {
//   // у стрелочных функций нет "this"
//   console.log(`Name: ${this.name}`)
// }
// info.bind(person)()

function info(phone, email) {
  console.log(`Name: ${this.name}, Tel: ${phone}, Email: ${email}`)
}

// // Demo
// info.bind(person)('123', '@email')
// info.bind(person, '123')('@email')
// info.bind(person, '123', '@email')()

// Bind on Pure JS
function bind(fn, context, ...rest) {
  // bind всегда должен возвращать другую функцию
  return function (...args) {
    const uniqId = Date.now().toString() // создаем уникальный ключ,
    // чтобы не перебить свойство в объекте, если оно уже существует
    context[uniqId] = fn // заносим функцию в свойство объекта
    // (делаем новый метод), для создания контекста
    const result = context[uniqId](...rest.concat(args)) // заносим
    // результат вызова нашего метода в переменную
    // (соединяем аргументы из двух функций)
    delete context[uniqId] // удаляем уникальный ключ
    // из нашего объекта, тк он нам больше не нужен,
    // ибо мы уже воспользовались нужным контекстом в объекте
    return result
  }
}

bind(info, person)('123', '@email')
bind(info, person, '123')('@email')
bind(info, person, '123', '@email')()
