class Foo {
    settings: any;
    constructor(args){
        this.settings = args;
    }
    bar(){
        return this.settings;
    }

}

let tmp = new Foo({foo:"bar"});

console.log(tmp.bar());