import React, {Component, createContext} from 'react';

/*
 * Context 객체를 만듭니다. Context 객체를 구독하고 있는 컴포넌트를 렌더링할 때 React는 트리 상위에서 가장 가까이 있는 짝이 맞는 Provider로부터 현재값을 읽습니다.
 * defaultValue 매개변수는 트리 안에서 적절한 Provider를 찾지 못했을 때만 쓰이는 값입니다. 컴포넌트를 독립적으로 테스트할 때 유용한 값입니다.
 * Provider를 통해 undefined을 값으로 보낸다고 해도 구독 컴포넌트들이 defaultValue 를 읽지는 않는다는 점에 유의하세요.
 */

const CC = createContext({
  value: 0,
  tag: '',
  SetValue: () => {},
});

export const CoreContext = CC;

export const CoreConsumer = CC.Consumer;

export class CoreProvider extends Component {
  SetValue = value => {
    this.state.value = value;
  };

  state = {
    value: 0,
    tag: '>>>>>>>>>>>>>>>>>>>',
    SetValue: this.SetValue,
  };

  render() {
    return <CC.Provider value={this.state}>{this.props.children}</CC.Provider>;
  }
}
