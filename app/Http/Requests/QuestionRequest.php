<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\RichTextNotEmptyRule;
use App\Rules\RichTextMaxRule;

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
            'title' => 'required | string | max:20',
            'body' => ['string', 'required', new RichTextNotEmptyRule, new RichTextMaxRule],
            'answer' => ['string', 'required', new RichTextNotEmptyRule, new RichTextMaxRule],
            'language_id' => 'required',
        ];
    }
    
    
}
