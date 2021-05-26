import React, {useEffect, useContext} from 'react';

import {CoreContext, CoreConsumer} from './core/CoreManagement';

import {useNavigation} from '@react-navigation/native';
import Weather from './components/Weather';

export default function View2(props) {
  const navigation = useNavigation();

  const {route} = props;

  const {params} = route;

  const result = useContext(CoreContext);

  return (
    <CoreConsumer>
      {({value, SetValue}) => (
        <>
          <Weather imageResource={params.imageResource} />
        </>
      )}
    </CoreConsumer>
  );
}
