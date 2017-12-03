namespace InterpreterPattern {
  abstract class Expression {
    public abstract interpret(context: Context);
  }

  class TerminalExpression extends Expression {
    private literal: string;

    constructor(literal: string) {
      super();
      this.literal = literal;
    }

    interpret(context: Context) {
      return context.string.includes(this.literal);
    }
  }

  class OrExpression extends Expression {
    private expression1: Expression;
    private expression2: Expression;

    constructor(expression1: Expression, expression2: Expression) {
      super();
      this.expression1 = expression1;
      this.expression2 = expression2;
    }

    interpret(context: Context) {
      return this.expression1.interpret(context) || this.expression2.interpret(context);
    }
  }

  class AndExpression extends Expression {
    private expression1: Expression;
    private expression2: Expression;

    constructor(expression1: Expression, expression2: Expression) {
      super();
      this.expression1 = expression1;
      this.expression2 = expression2;
    }

    interpret(context: Context) {
      return this.expression1.interpret(context) && this.expression2.interpret(context);
    }
  }

  class Context {
    public string: string;

    constructor(string) {
      this.string = string;
    }
  }

  // Client code
  // Define the rule: a boy has to be "rich or (smart and handsome)"
  const richExpression = new TerminalExpression('rich');
  const smartExpression = new TerminalExpression('smart');
  const handsomeExpression = new TerminalExpression('handsome');

  const smartAndHandsomeExpression = new AndExpression(smartExpression, handsomeExpression);
  const interpreterTree = new OrExpression(richExpression, smartAndHandsomeExpression);

  const interpret = (context) =>
    interpreterTree.interpret(context)
      ? 'Good!'
      : 'Not good enough...'

  console.log(interpret(new Context('Dick is handsome but stupid')));          // Not good enough...
  console.log(interpret(new Context('Bob is smart but ugly')));                // Not good enough...
  console.log(interpret(new Context('John is handsome and smart')));           // Good!
  console.log(interpret(new Context('Garry is stupid and ugly but rich')));    // Good!
}
