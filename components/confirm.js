import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

const ConfirmPage = ({ modalClickAction }) => {

    const [name, setName] = useState('')
    const [id, setID] = useState('')
    const [pw, setPW] = useState('')

    const [open, setOpen] = useState(true);

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as='div' className='fixed z-10 inset-0 overflow-y-auto' onClose={setOpen}>
                <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-28 text-center sm:block sm:p-0'>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                    </Transition.Child>

                    <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        enterTo='opacity-100 translate-y-0 sm:scale-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                        leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                    >
                        <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full'>
                            <div className='bg-white px-4 pt-5 pb-4 sm:p-8 sm:pb-4'>
                                <div className='mt-16 md:grid md:grid-cols-3 md:gap-16'>
                                    <div className='md:col-span-1'>
                                        <div className='px-4 sm:px-0'>
                                            <h3 className='text-4xl tracking-tight leading-tight font-black text-gray-900 sm:leading-none'>로그인</h3>
                                            <p className='mt-4 text-sm text-gray-600'>
                                                팀 디스코드에 당신의 이번 주 개발 목표를 보낼 예정입니다. 만약 이번 주 안에 개발 목표를 달성하지 못할 시, 후에 불이익이 있을 수도 있습니다.
                                            </p>
                                        </div>
                                    </div>
                                    <div className='mt-5 md:mt-0 md:col-span-2'>
                                        <div className='sm:overflow-hidden'>
                                            <div className='px-4 py-5 bg-white space-y-6 sm:p-6 sm:-m-6'>
                                                <div className='col-span-3 sm:col-span-2'>
                                                    <label className='block tracking-wide text-gray-700 text-base font-bold mb-2'>
                                                        이름
                                                    </label>
                                                    <input
                                                        type='text' placeholder='이름을 입력하세요.'
                                                        className='required:border-red-500 relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 text-sm'
                                                        value={name}
                                                        onChange={(e) => {
                                                            setName(e.target.value)
                                                        }}
                                                    />
                                                </div>
                                                <div className='col-span-3 sm:col-span-2'>
                                                    <label className='block tracking-wide text-gray-700 text-base font-bold mb-2'>
                                                        아이디
                                                    </label>
                                                    <input
                                                        type='text' placeholder='아이디를 입력하세요.'
                                                        className='required:border-red-500 relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 text-sm'
                                                        value={id}
                                                        onChange={(e) => {
                                                            setID(e.target.value)
                                                        }}
                                                    />
                                                </div>
                                                <div className='col-span-3 sm:col-span-2'>
                                                    <label className='block tracking-wide text-gray-700 text-base font-bold mb-2'>
                                                        비밀번호
                                                    </label>
                                                    <input
                                                        type='password' placeholder='비밀번호를 입력하세요.'
                                                        className='required:border-red-500 relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 text-sm'
                                                        value={pw}
                                                        onChange={(e) => {
                                                            setPW(e.target.value)
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                                <button
                                    type='button'
                                    className='mt-3 w-full inline-flex justify-center rounded-md border border-solid border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                                    onClick={() => modalClickAction.cancel()}
                                >
                                    취소
                                </button>
                                <div className='mt-3'></div>
                                <button
                                    type='button'
                                    className='w-full inline-flex justify-center rounded-md border border-solid border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm'
                                    onClick={() => modalClickAction.check(name, id, pw)}
                                >
                                    확인
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ConfirmPage;