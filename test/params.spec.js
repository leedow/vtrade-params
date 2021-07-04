const assert = require('assert')
const Params = require('../core/params')

describe('测试',function(){
	let params = null
	let full = [
		[1,2],
		[4,5],
		[7,8],
		[10,11]
	]

	it('descartes',function(){
		params = new Params(full)
		let all = params.descartes(...full)
		console.log(all)
		assert.deepEqual( all.length, 2*2*2*2)
		assert.deepEqual( params.all.length, 2*2*2*2)
	})

	it('rule',function(){
		params.rule(['*', '*', '*', '*'])
		assert.deepEqual( params._rule, ['*', '*', '*', '*'])
	})

	it('match1',function(){
		assert.deepEqual( params.match(['*', '*', '*'], [1, 2, 3]), [1, 2, 3])
	})

	it('match2',function(){
		assert.deepEqual( params.match(['1', '*', '*'], [1, 2, 3]), [1, 2, 3])
	})

	it('match3',function(){
		assert.deepEqual( params.match(['2', '*', '*'], [1, 2, 3]), false)
	})

	it('match4',function(){
		assert.deepEqual( params.match(['2', '-', '*'], [1, 2, 3]), false)
	})

	it('match5',function(){
		assert.deepEqual( params.match(['1', '-', '*'], [1, 2, 3]), [1, null, 3])
	})

	it('match6',function(){
		assert.deepEqual( params.match(['1', '-', '*'], [1, 2, 3], '*'), [1, '*', 3])
	})

	it('result1',function(){
		assert.deepEqual( params.rule([1,4,7, '*']).result(), [
			[1,4,7,10],
			[1,4,7,11]
		])
	})

	it('result2',function(){
		assert.deepEqual( params.rule(['-','-','*', '*']).result(), [
			[null,null,7,10],
			[null,null,7,11],
			[null,null,8,10],
			[null,null,8,11]
		])
	})

	it('result3',function(){
		assert.deepEqual( params.rule(['-','-','7', '10']).result('*'), [
			['*','*',7,10]
		])
	})

	it('result4',function(){
		assert.deepEqual( params.rule(['*','*','7', '10']).result('*'), [
			[1,4,7,10],
			[1,5,7,10],
			[2,4,7,10],
			[2,5,7,10]
		])
	})

})