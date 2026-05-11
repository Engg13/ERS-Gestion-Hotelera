import { SelectField } from '@figma/astraui';
import { useCurrency } from '../context/CurrencyContext';
import { useLanguage } from '../context/LanguageContext';

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();
  const { t } = useLanguage();

  const handleCurrencyChange = (val: string) => {
    if (val === 'CLP' || val === 'USD') {
      setCurrency(val);
    }
  };

  return (
    <SelectField
      label={t('currency.title')}
      options={[
        { value: 'CLP', label: t('currency.clp') },
        { value: 'USD', label: t('currency.usd') },
      ]}
      value={currency}
      onChange={handleCurrencyChange}
    />
  );
}
