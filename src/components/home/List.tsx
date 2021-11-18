import React from 'react';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { WORKING } from '../../helper';
import { HomelistInterface } from '../../interfaces';

const ItemIcon: React.FC<{
  diagnosticStart: boolean;
  icon: string;
  isWorking: string;
}> = ({ diagnosticStart, icon, isWorking }) => {
  const FONT_SIZE = 30;
  const FONT_COLOR = '#000000';
  if (isWorking != '' && isWorking !== undefined) {
    return isWorking === WORKING ? (
      <Icon size={FONT_SIZE} color={FONT_COLOR} name={'check'} />
    ) : (
      <Icon size={FONT_SIZE} color={FONT_COLOR} name={'close'} />
    );
  }
  return diagnosticStart ? (
    <Icon name={'refresh'} size={FONT_SIZE} color={FONT_COLOR} />
  ) : (
    <Icon size={FONT_SIZE} color={FONT_COLOR} name={icon} />
  );
};

export const List: React.FC<{
  navigate: any;
  item: HomelistInterface;
  diagnosticStart: boolean;
  isWorking: string;
}> = ({ diagnosticStart, navigate, item, isWorking }) => {
  // const wifi = useWifi(diagnosticStart);
  // console.log(wifi);

  return (
    <ListItem onPress={() => navigate(item.name)} bottomDivider>
      <ItemIcon
        icon={item.icon}
        diagnosticStart={diagnosticStart}
        isWorking={isWorking}
      />
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
};
