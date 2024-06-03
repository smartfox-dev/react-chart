import React from 'react';

export default function LanguageSelect({ label, language, setLanguage }) {

  const handleChange = (event) => {
    setLanguage(event.target.value);
  }

  return (
    <div className='flex items-center'>
      <label htmlFor="language" className='mr-3 text-[30px]'>{label}:</label>
      <select name="language" id="language" className='w-[200px] py-2 px-3 rounded-md' value={language} onChange={handleChange}>
        {countries.map((item, index) => (
          <option value={item.code} key={index}>{item.label}</option>
        ))}
      </select>
    </div>
  );
}

const countries = [
  {
    code: 'en',
    label: 'English',
    phone: '1',
    suggested: true,
  },
  {
    code:
      'es',
    label: 'Spanish',
    phone: '34'
  },
  {
    code: 'fr',
    label: 'French',
    phone: '590',
  },
  {
    code: 'de',
    label: 'German',
    phone: '49',
    suggested: true,
  },
  { code: 'zh-cn', label: 'Chinese', phone: '86' },
  {
    code: 'ja',
    label: 'Japanese',
    phone: '81',
    suggested: true,
  },
  { code: 'ar', label: 'Arabia', phone: '966' },
]