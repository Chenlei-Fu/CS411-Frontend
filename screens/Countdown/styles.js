import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

export const Container = styled(LinearGradient).attrs({
    colors: ['#f2f2f2', '#80A1B1'],
})`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  color: #4f1c35;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  max-width: 300px;
  margin-top: 0px;
  margin-bottom: 80px;
`;

export const Icon = styled(MaterialIcons).attrs({
    size: 32,
    color: '#fff',
})``;

export const Progress = styled.Text`
  color: #4f1c35;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;
