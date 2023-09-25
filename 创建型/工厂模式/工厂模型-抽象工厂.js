/*

大家现在回头对比一下抽象工厂和简单工厂的思路，思考一下：它们之间有哪些异同？

它们的共同点，在于都尝试去分离一个系统中变与不变的部分。它们的不同在于场景的复杂度。在简单工厂的使用场景里，处理的对象是类，并且是一些非常好对付的类——它们的共性容易抽离，同时因为逻辑本身比较简单，故而不苛求代码可扩展性。抽象工厂本质上处理的其实也是类，但是是一帮非常棘手、繁杂的类，这些类中不仅能划分出门派，还能划分出等级，同时存在着千变万化的扩展可能性——这使得我们必须对共性作更特别的处理、使用抽象类去降低扩展的成本，同时需要对类的性质作划分，于是有了这样的四个关键角色：

抽象工厂（抽象类，它不能被用于生成具体实例）： 用于声明最终目标产品的共性。在一个系统里，抽象工厂可以有多个（大家可以想象我们的手机厂后来被一个更大的厂收购了，这个厂里除了手机抽象类，还有平板、游戏机抽象类等等），每一个抽象工厂对应的这一类的产品，被称为“产品族”。
具体工厂（用于生成产品族里的一个具体的产品）： 继承自抽象工厂、实现了抽象工厂里声明的那些方法，用于创建具体的产品的类。
抽象产品（抽象类，它不能被用于生成具体实例）： 上面我们看到，具体工厂里实现的接口，会依赖一些类，这些类对应到各种各样的具体的细粒度产品（比如操作系统、硬件等），这些具体产品类的共性各自抽离，便对应到了各自的抽象产品类。
具体产品（用于生成产品族里的一个具体的产品所依赖的更细粒度的产品）： 比如我们上文中具体的一种操作系统、或具体的一种硬件等。

抽象工厂模式的定义，是围绕一个超级工厂创建其他工厂。本节内容对一些工作年限不多的同学来说可能不太友好，但抽象工厂目前来说在JS世界里也应用得并不广泛，所以大家不必拘泥于细节，只需留意以下三点：
- 学会用 ES6 模拟 JAVA 中的抽象类；
- 了解抽象工厂模式中四个角色的定位与作用；
- 对“开放封闭原则”形成自己的理解，知道它好在哪，知道执行它的必要性
*/

/*
  AbstractFactory（抽象工厂）
*/
class MobilePhoneFactory {
  //创建操作系统
  createOS() {
    throw new Error('抽象工厂的方法不允许直接调用,你需要将我重写!')
  }
  //创建硬件
  createHardWare() {
    throw new Error('抽象工厂的方法不允许直接调用,你需要将我重写!')
  }
}

class OS {
  //硬件控制器
  controlHardWare() {
    throw new Error('抽象工厂的方法不允许直接调用,你需要将我重写!')
  }
}

class HardWare {
  //根据命令运转
  operateByOrder() {
    throw new Error('抽象工厂的方法不允许直接调用,你需要将我重写!')
  }
}

/*
  具体工厂（ConcreteFactory）
*/
class AndroidOS extends OS {
  controlHardWare() {
    console.log('我将使用安卓系统图形化界面操控硬件')
  }
}

class AppleOS extends OS {
  controlHardWare() {
    console.log('我将使用苹果系统图形化界面操控硬件')
  }
}

class QualcommHardWare extends HardWare {
  operateByOrder() {
    console.log('我会用高通的硬件独有的方式去运转')
  }
}

class AppHardWare extends HardWare {
  operateByOrder() {
    console.log('我会用苹果硬件独有的方式运转')
  }
}

class AndroidPhone extends MobilePhoneFactory {
  //重写父类的方法
  createOS() {
    //提供安卓系统实例
    return new AndroidOS()
  }
  createHardWare() {
    //提供高通的硬件实例
    return new QualcommHardWare()
  }
}

//创建一个手机实例
const myAndroidPhone = new AndroidPhone()
//创建安卓系统实例
const myAndroidOS = myAndroidPhone.createOS()
//创建高通安卓硬件实例
const myHardWare = myAndroidPhone.createHardWare()
//启动安卓系统
myAndroidOS.controlHardWare()
//启动高通硬件
myHardWare.operateByOrder()
