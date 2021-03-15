if ({a:10} === {a:10}){
	console.log(true)
} else {
	console.log(false)
}

if ([] === []){
	console.log(true)
} else {
	console.log(false)
}

const first = {a:10, b:{c:20}}
const second = {...first}
const third = first
first.a = 30
first.b.c = 40

console.log(first)
console.log(second)
console.log(third)

const set = () => {
	console.log(1)
	setTimeout(() => {
		console.log(2)
	}, 0)
	console.log(3)
}

console.log(set())