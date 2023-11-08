import { useContext } from 'react';
import { useTranslation } from 'next-i18next';
import HomeContext from '@/pages/api/home/home.context';

export const ModelSelect = () => {
  const { t } = useTranslation('chat');

  const {
    state: { selectedConversation },
    handleUpdateConversation,
  } = useContext(HomeContext);

  // Hardcoded model ID and name
  const hardcodedModelId = 'gpt-4-1106-preview';
  const hardcodedModelName = 'GPT-4-1106 Preview';

  // Since the model is hardcoded, the handleChange can simply pass the hardcoded model
  const handleChange = () => {
    handleUpdateConversation(selectedConversation, {
      key: 'model',
      value: { id: hardcodedModelId, name: hardcodedModelName },
    });
  };

  return (
    <div className="flex flex-col">
      <label className="mb-2 text-left text-neutral-700 dark:text-neutral-400">
        {t('Model')}
      </label>
      <div className="w-full rounded-lg border border-neutral-200 bg-transparent pr-2 text-neutral-900 dark:border-neutral-600 dark:text-white">
        {/* The select input is disabled since the model is hardcoded */}
        <select
          className="w-full bg-transparent p-2"
          placeholder={t('Select a model')}
          value={hardcodedModelId}
          onChange={handleChange}
          disabled={true}
        >
          {/* Only one option is available which is the hardcoded model */}
          <option
            key={hardcodedModelId}
            value={hardcodedModelId}
            className="dark:bg-[#343541] dark:text-white"
          >
            {hardcodedModelName}
          </option>
        </select>
      </div>
      {/* ...rest of your component */}
    </div>
  );
};
