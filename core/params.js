
module.exports = class Params { 
	constructor(fullParams) {
		this.fullParams = fullParams
		this._rule = null
		this.all = this.descartes(...this.fullParams)
	}

	/*
	 * 设定组合生成规则
	 * ['*', '-', 'params value']  -> [通配符, 忽略, 固定具体参数值]
	 */
	rule(rule) {
		if(Array.isArray(rule) && (rule.length == this.fullParams.length)) {
			this._rule = rule
		} else {
			console.error('wrong format rule')
			this._rule = null
		}
		return this
	}

	/*
	 * 校验参数组合是否符合统配规则
	 * 符合返回符合的参数组合，'-'类型通配符，属性返回null
	 * 不符合则返回false
	 */
	match(rule, params) {
		let res = []

		for (let i = 0; i < params.length; i++) {
			let param = params[i]
			let ruleParam = rule[i]

			if(ruleParam == '*') {
				res.push(param)
			} else if(ruleParam == '-'){
				res.push(null)
			} else {
				if(ruleParam == param) {
					res.push(param)
				} else {
					res = false
					break
				}
			}
		}
		
		return res
	}

	result() {
		if(this._rule) {
			let res = []

			this.all.forEach(one => {

			})

		} else {
			return this.all
		}
	}

	descartes(...args) {
	    if (args.length < 2) {
	        return args[0].map(item => [item])
	    }
	    return [].reduce.call(args, (col, set) => {
	        let res = []
	        col.forEach(c => {
	            set.forEach(s => {
	                let t = [].concat(Array.isArray(c) ? c : [c])
	                t.push(s)
	                res.push(t)
	            })
	        })
	        return res
	    })
	}

}