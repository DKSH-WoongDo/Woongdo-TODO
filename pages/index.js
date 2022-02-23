import { PlusSmIcon, XIcon } from '@heroicons/react/outline';
import axios from 'axios';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import ModalConfrim from '../components/confirm';
import Footer from '../components/footer';
import Loader from '../components/loader';
import { API_URL, webHookURL } from '../config';
import cryptoHandle from '../lib/crypto';


const Home = () => {

  const [query, setQuery] = useState('');
  const [history, setHistory] = useState(query);

  const [enterQ, setEnterQ] = useState(false);
  const [data, setData] = useState([])

  const [name, setName] = useState('')
  const [id, setID] = useState('')
  const [pw, setPW] = useState('')

  useEffect(() => {
    if (localStorage.getItem('todoArr') === null) {
      localStorage.setItem('todoArr', JSON.stringify({ data: [] }));
    } else {
      setData(JSON.parse(localStorage.getItem('todoArr')).data);
    }
  }, []);

  useEffect(() => {
    let appData = JSON.parse(localStorage.getItem('todoArr'));
    if (appData !== null) {
      let updatedData = (appData = { ...appData, data });
      localStorage.setItem('todoArr', JSON.stringify(updatedData));
    }
  }, [data]);

  const handleAdd = () => {
    if (history && enterQ) {
      let appData = JSON.parse(localStorage.getItem('todoArr'));
      let todoArray = appData.data;
      todoArray = [
        ...todoArray,
        { todo: history, isChecked: false, id: data.length },
      ];
      setData(todoArray)
    }
    setQuery('')
    setEnterQ(false)
  }

  useEffect(() => {
    handleAdd();
  }, [history])

  const handleDel = (itemID) => {
    let appData = JSON.parse(localStorage.getItem('todoArr'));
    setData(appData.data.filter((item) => item.id !== itemID))
    let updatedData = { ...appData, data };
    localStorage.setItem('todoArr', JSON.stringify(updatedData));
  }

  const handleCheck = (itemID) => {
    let appData = JSON.parse(localStorage.getItem('todoArr'));
    setData(appData.data.map((item) => {
      if (item.id === itemID) return { ...item, isChecked: !item.isChecked };
      return item;
    }))
    let updatedData = { ...appData, data };
    localStorage.setItem('todoArr', JSON.stringify(updatedData));
  }

  const bookDataRender = data && data.map((item) => (
    <>
      <li className='cursor-pointer grid grid-cols-10 gap-4 justify-center items-center px-4 py-2 rounded-lg hover:bg-gray-50'>
        <div
          className='col-start-1 col-end-9'
          onClick={() => {
            handleCheck(item?.id);
          }}>
          {item?.isChecked ?
            <p className='text-blue-500 mt-1 font-regular text-sm'>Complete</p>
            : <p className='text-red-600 mt-1 font-regular text-sm'>In progress</p>}
          <h3 className='text-gray-900 font-medium text-md'>{item?.todo}</h3>
        </div>
        <div
          className='cursor-pointer flex justify-center items-center col-start-9 col-end-11 pl-8 sm:col-start-10'
          onClick={() => { handleDel(item?.id) }}
        >
          <XIcon className='w-6 h-6' />
        </div>
      </li>
    </>
  ))

  const [alert, setAlert] = useState(false);
  const [xConfirm, setConfirm] = useState(false);

  const clickModal = {
    check: (name, id, pw) => {
      setAlert(!alert);
      setConfirm(true);
      setName(name);
      setID(id);
      setPW(pw);
    },
    cancel: () => {
      setAlert(!alert);
      setConfirm(false);
    }
  }

  const onClickLogin = async () => {
    if (!name || !id || !pw) {
      return false
    } else {
      try {
        const response = await axios({
          url: '/login',
          baseURL: API_URL,
          method: 'post',
          data: {
            userID: cryptoHandle.AES_ENC(id),
            userPW: cryptoHandle.AES_ENC(pw)
          }
        })
        const loadData = response.data;
        return !loadData.isError
      } catch (err) {
        return false
      }
    }
  }

  const sendWebHook = async () => {
    if (xConfirm) {
      const isLoggedIn = await onClickLogin()
      if (isLoggedIn) {
        try {
          const response = await axios({
            url: webHookURL,
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            data: {
              content: null,
              embeds: [{
                title: `${name}님의 이번 주 개발목표`,
                description: `마감일 : ${new Date(Date.parse(new Date()) + 7 * 1000 * 60 * 60 * 25).toISOString().split('T')[0]}`,
                color: 5814783,
                fields: data.map((item, idx) => {
                  return {
                    name: `${idx + 1}번째 개발목표`,
                    value: item.todo
                  }
                })
              }]
            }
          })
          toast.success('메세지를 보냈습니다.', { autoClose: 1500 });
        } catch (err) {
          toast.error('서버와의 연결이 끊겼습니다.', { autoClose: 1500 });
        }
      } else {
        toast.error('로그인에 실패했습니다.', { autoClose: 1500 });
      }
      setConfirm(false)
    }
  }

  useEffect(() => {
    sendWebHook()
  }, [xConfirm])

  return (
    <>
      <Head>
        <title>Woongdo - TODO</title>
        <meta property='og:title' content='Woongdo - TODO' />
        <meta property='og:description' content='Click This.' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://wtodo.vercel.app/' />
        <meta property='og:image' content='/img/woongdo.png' />
      </Head>
      <ToastContainer />
      {
        alert &&
        <ModalConfrim
          modalClickAction={clickModal}
        />
      }
      {
        xConfirm &&
        <Loader />
      }
      <div className='max-w-screen-xl mx-auto px-2 sm:px-6 lg:px-8'>
        <div className='px-3 mt-10 sm:mt-28'>
          <h2 className='text-5xl tracking-tight leading-tight font-black text-gray-900 sm:leading-none'>
            TODO+-
          </h2>
          <p className='mt-3 text-sm text-gray-500 sm:mt-3 sm:text-lg sm:mx-auto lg:mx-0'>
            이 프로젝트는 웅도 팀을 위해서 개발되었습니다. 외부 DB를 사용하지 않고, localStorage를 통해 Todo List를 저장합니다.
          </p>
        </div>
        <div className='mt-6 mb-6 sm:pt-6'>
          <div className='px-3 mb-12 flex flex-col items-center'>
            <div className='w-full mx-auto flex items-center'>
              <input
                name='q'
                type='text'
                placeholder='개발 목표를 입력 후 엔터를 치세요'
                className='shadow-lg mx-auto w-full aggroM-font border border-gray-200 py-4 px-5 pl-5 pr-10 rounded-lg focus:outline-none'
                autoComplete='off'
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    setHistory(query);
                    setEnterQ(true);
                  }
                }}
              />
              <button className='text-gray-500 relative right-10 -mr-5' onClick={() => {
                setHistory(query);
                setEnterQ(true);
              }}>
                <PlusSmIcon className='h-6 w-6' aria-hidden='true' />
              </button>
            </div>
          </div>
        </div>
        <div className='relative'>
          <ul className='rounded-md shadow-md bg-white left-0 right-0 -bottom-18 mt-3 p-3'>
            <li className='text-gray-500 border-b border-gray border-solid py-3 px-3 mb-2'>
              약 {data?.length}개의 개발 목표가 있습니다.
            </li>
            {bookDataRender}
          </ul>
          <div className='py-16 text-center'>
            <button
              type='button'
              className='button-action cursor-pointer mx-auto hover:bg-blue-600 w-64 px-5 py-5 text-sm leading-5 font-semibold text-white bg-blue-500 inline-flex justify-center active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
              onClick={() => { setAlert(true) }}>
              <span>부장에게 개발 목표 보내기</span>
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
