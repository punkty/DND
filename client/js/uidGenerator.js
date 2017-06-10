function ABCid() {
    const uids = {},
        codeSeed = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    
    this.generate = (len=5) => {
        let code
        do {
            code = ''
            for (let i = 0; i < len; i++) {
                code += codeSeed[randomInt(0,codeSeed.length-1)]
            }
        } while (uids[code])
        this.add(code)
        return code
    }

    this.add = ids => {
        uids[ids] = true
    }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}
