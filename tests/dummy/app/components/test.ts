import Component from '@glimmer/component';

interface TestSignature {
  Args: {
    wow: string;
  };
}
export default class TestComponent extends Component<TestSignature> {
  public get wow() {
    return this.args.wow;
  }
}
