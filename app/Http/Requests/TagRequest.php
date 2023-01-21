<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
            'language_id' => 'required',
            'name' => ['required', 'max:20', Rule::unique('tags')->where('language_id', $this->language_id)] 
            
        ];
    }
    
    
    // public function messages(){
    //     return [
    //         'name.required' => ''
        
    //     ];
    // }
    
    
}
