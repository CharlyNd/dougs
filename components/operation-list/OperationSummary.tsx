import { View, Text } from 'react-native';
import Colors from '~/constants/Colors';
import { Loading } from '../ui/Loading';

interface OperationSummaryProps {
  credit: number;
  debit: number;
  balance: number;
  loading?: boolean;
}

export function OperationSummary({ credit, debit, balance, loading }: OperationSummaryProps) {
  if (loading) {
    return (
      <View className="flex-row justify-between bg-white rounded-2xl px-5 py-4 m-6" style={{ boxShadow: '4px 6px 7px 5px rgba(0, 0, 0, 0.07)' }}>
        <Loading size="small" className="flex-1" />
      </View>
    );
  }

  return (
    <View className="flex-row justify-between bg-white rounded-2xl px-5 py-4 m-6" style={{ boxShadow: '4px 6px 7px 5px rgba(0, 0, 0, 0.07)' }}>
      <View className="items-center">
        <View className='items-end'>
          <Text className="text-xl font-semibold font-[Inter]" style={{ color: Colors.black.text }}>
            {credit % 1 === 0
              ? credit.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0 })
              : credit.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
          </Text>
          <Text className="text-gray-600 text-base mt-1" style={{ color: Colors.labelSummary }}>Crédit</Text>
        </View>
      </View>
      <View className="items-center">
        <View className='items-end'>
          <Text className="text-lg font-semibold font-[Inter]" style={{ color: Colors.red.text }}>
            {debit % 1 === 0
              ? debit.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0 })
              : debit.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
          </Text>
          <Text className="text-gray-600 text-base mt-1" style={{ color: Colors.labelSummary }}>Débit</Text>
        </View>
      </View>
      <View className="items-center">
        <View className='items-end'>
          <Text className="text-lg font-semibold font-[Inter] text-green-400" style={{ color: Colors.green.text }}>
            {balance % 1 === 0
              ? balance.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0 })
              : balance.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
          </Text>
          <Text className="text-gray-600 text-base mt-1" style={{ color: Colors.labelSummary }}>Solde</Text>
        </View>
      </View>
    </View>
  );
} 