import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isEmpty } from '../../utils';
import { SERVER_URL } from '../../config';
import axios from 'axios';
import { toastr } from '../../utils/toastr';
import store from '..';

const initialState = {
  selectedTab: 'TAB_CHART',
  errors: {},
  redirect: false,
  isLoading: false,
  limit: '100',
  dumyInfo: {
    output: 100,
    defects: 0,
    percentage: 0,
  },
  langInfo: {
    // static option
    topMenu1: 'Chart',
    topMenu2: 'Settings',
    downloadLabel: 'DownloadPDF',
    wastageLabel: 'Wastage',
    selectLangLabel: 'Select Language',
    translateLabel: 'Translate',
    footerLabel: 'Marko Todorovic. All Rights Reserved. Privacy Policy',
    inputNameLabel: 'Machine 1',
    inputHeaderLabel: 'Output vs Defects',
    inputOutputLabel: 'Output',
    inputDefectsLabel: 'Defects',
    inputLimitLabel: 'Percentage Limit',
    saveLabel: 'Save',
    // user defiend option
    nameLabel: 'Machine 1',
    headerLabel: 'Output vs Defects',
    outputLabel: 'Output',
    defectsLabel: 'Defects',
    exceedLabel: 'Limit Exceeded',
  }
}

export const saveSetting = createAsyncThunk(
  'setting/saveSetting',
  async (params) => {
    let url = SERVER_URL + `api/setting/save`;
    try {
      const res = await axios.post(url, params);
      let data = await res?.data;
      if (data?.status === 1) {
        toastr.error(data?.message);
        return null
      }
      toastr.success('Created successfully!')
      return data?.data;
    }
    catch (err) {
      return null
    }
  }
)

export const getSetting = createAsyncThunk(
  'setting/getSetting',
  async () => {
    let url = SERVER_URL + `api/setting/get`;
    try {
      const res = await axios.post(url);
      console.log("---------------getSetting----------------", res);
      let data = await res?.data;
      if (data?.status === 1) {
        return null
      }
      return data?.data;
    }
    catch (err) {
      return null
    }
  }
)

export const translateLanguage = createAsyncThunk(
  'setting/translateLanguage',
  async (params) => {
    let url = SERVER_URL + `api/setting/translate`;
    try {
      const res = await axios.post(url, params);
      let { data: wordArray } = await res?.data;
      console.log('-----------translateLanguage---------', wordArray);
      return wordArray;
    }
    catch (err) {
      return null
    }
  }
)

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setErrors: (state, action) => { state.errors = action.payload },
    setRedirect: (state, action) => { state.redirect = action.payload },
    setIsLoading: (state, action) => { state.isLoading = action.payload },
    setTab: (state, action) => { state.selectedTab = action.payload },
    setDumyData: (state, action) => { state.dumyInfo = action.payload },
    setLangInfo: (state, action) => { state.langInfo = action.payload },
  },
  extraReducers: (builder) => {
    builder.addCase(getSetting.fulfilled, (state, action) => {
      if (action?.payload) {
        const { id, name, header, output, defects, limit } = action?.payload;
        state.langInfo = { ...state.langInfo, nameLabel: name, headerLabel: header, outputLabel: output, defectsLabel: defects };
        state.limit = limit;
      }
    })
    builder.addCase(saveSetting.fulfilled, (state, action) => {
      if (action?.payload) {
        const { id, name, header, output, defects, limit } = action?.payload;
        state.langInfo = { ...state.langInfo, nameLabel: name, headerLabel: header, outputLabel: output, defectsLabel: defects };
        state.limit = limit;
      }
    })
    builder.addCase(translateLanguage.fulfilled, (state, action) => {
      if (action?.payload) {
        const data = action?.payload;
        const reconstructedLangInfo = {};
        const keys = Object.keys(state.langInfo);
        data.forEach((value, index) => {
          reconstructedLangInfo[keys[index]] = value;
        });
        state.langInfo = reconstructedLangInfo;
        state.isLoading = false;
      }
    })
  }
})

export const { setErrors, setRedirect, setIsLoading, setTab, setDumyData, setLangInfo } = settingSlice.actions;

export default settingSlice.reducer