<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TagRequest extends FormRequest
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
            'tag_name' => 'required | max:20',
            'language_id' => 'required'
        ];
    }
    
    
    // public function messages(){
    //     return [
    //         'name.required' => ''
        
    //     ];
    // }
    
    
}
