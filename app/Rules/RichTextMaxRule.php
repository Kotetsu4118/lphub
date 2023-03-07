<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class RichTextMaxRule implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return mb_strlen($value, 'UTF-8') <= 1000000;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return '入力内容の容量が大きすぎます。文字数を減らすか、文字フォーマットをプレーンにすると容量は小さくなります';
    }
}
