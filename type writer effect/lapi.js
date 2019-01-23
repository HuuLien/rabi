const log = function () {
    console.log.apply(console, arguments)
}

const toggleClass = function(element, className) {
    if(element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

const TypeWriter = function (textElement, words, wait = 3000) {
    this.textElement = textElement
    this.words = words
    this.txt = ''
    this.wordIndex = 0
    this.wait = parseInt(wait, 10)
    this.type()
    this.cursorTwinkle()
    this.isDeleting = false
}
TypeWriter.prototype.cursorTwinkle = function() {
    // 1. 出现时间为??
    // 2. 消失时间短语出现时间
    setTimeout(() => {
        if (!this.textElement.classList.contains('has-border')) {
            this.textElement.classList.add('has-border')
        }
    }, 300)
    setTimeout(() => {
        this.textElement.classList.remove('has-border')
    }, 700)
    setTimeout(() => this.cursorTwinkle(), 901)
}

TypeWriter.prototype.type = function () {
    const current = this.wordIndex % this.words.length
    const fullTxt = this.words[current]
    // log(fullTxt, typeof fullTxt)
    if (this.isDeleting) {
        // remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1)
    } else {
        // add char
        this.txt = fullTxt.substring(0, this.txt.length + 1)
    }
    // insert txt into element
    this.textElement.innerHTML = this.txt

    // initial type speed
    let typeSpeed = 300
    if(this.isDeleting) {
        typeSpeed /= 2
    }
    if (!this.isDeleting && this.txt === fullTxt) {
        this.isDeleting = true
        typeSpeed = 3000
    } else if(this.isDeleting && this.txt === '') {
        this.wordIndex++
        this.isDeleting = false
        typeSpeed = 500
    }
    setTimeout(() => this.type(), typeSpeed)
}




var __main = function () {
    var init = function () {
        const textElement = document.querySelector('.text-type')
        const words = JSON.parse(textElement.dataset.words)
        // log(words)
        const wait = textElement.dataset.wait
        new TypeWriter(textElement, words, wait)
    }
    document.addEventListener('DOMContentLoaded', init())
}

__main()