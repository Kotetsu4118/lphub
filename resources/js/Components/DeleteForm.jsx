import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';

export default function DeleteForm({ needConfirm=true, onDengerButton, showModal, onClose, onSubmit, message, text_id, input_value, label_value, processing, handleChange, errors, closeModal}){
    return(
        <div>
            <DangerButton onClick={onDengerButton}>削除</DangerButton>
    
            <Modal show={showModal} onClose={closeModal}>
                <form onSubmit={onSubmit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        {message}
                    </h2>
                    
                    { needConfirm && (
                    <div>
                        <p className="mt-1 text-sm text-gray-600">
                            削除する場合は「確認」と入力してください
                        </p>
                        
                        <div className="mt-6">
                            <InputLabel for={text_id} value={label_value} className="sr-only" />
    
                            <TextInput
                                id={text_id}
                                // name="password"
                                value={input_value}
                                handleChange={(e) => handleChange(e)}
                                className="mt-1 block w-3/4"
                                isFocused
                                placeholder="確認"
                            />
    
                            <InputError message={errors.confirm} className="mt-2" />
                        </div>
                    </div>
                    )}

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>キャンセル</SecondaryButton>

                        <DangerButton className="ml-3" processing={processing}>
                            削除
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </div>
    );
    
}