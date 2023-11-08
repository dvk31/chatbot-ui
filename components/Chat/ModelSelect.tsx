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

  const handleChange = () => {
    if (selectedConversation) {
      handleUpdateConversation(selectedConversation, {
        key: 'model',
        value: { id: hardcodedModelId, name: hardcodedModelName },
      });
    }
  };

  // Safely get the translated string or return the key itself
  const safeT = (key: string): string => {
    const translation = t(key);
    return typeof translation === 'string' ? translation : key;
  };

  return (
    <div className="flex flex-col">
      <label className="mb-2 text-left text-neutral-700 dark:text-neutral-400">
        {safeT('Model')} {/* Use safeT instead of t */}
      </label>
      <div className="w-full rounded-lg border border-neutral-200 bg-transparent pr-2 text-neutral-900 dark:border-neutral-600 dark:text-white">
        <select
          className="w-full bg-transparent p-2"
          aria-label={safeT('Select a model')} // Use safeT instead of t
          value={hardcodedModelId}
          onChange={handleChange}
          disabled={true}
        >
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
