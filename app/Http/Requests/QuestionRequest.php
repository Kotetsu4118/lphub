<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class QuestionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'question.title' => 'required | string | max:20',
            'question.body' => 'required | string | max:2000',
            'question.answer' => 'required | string | max:2000',
            'question.language_id' => 'required',
        ];
    }
    
    public function messages(){
        return [
            'title.required' => 'タイトルは必須項目です',
            'title.max' => 'タイトルは20文字までです',
            'body.required' => '問題文は必須項目です',    
            'body.max' => '問題文は2000文字までです',
            'answer.required' => '答えは必須項目です',    
            'answer.max' => '答えは2000文字までです',
            'language_id.required' => '言語の選択は必須です',
        ];
        
    }
    
}
