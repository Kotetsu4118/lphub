<label for="{{ Auth::user()->id }}">完了フラグ</label>
<input type="checkbox" value='{{ Auth::user()->id }}' id="{{ Auth::user()->id }}" name="complete_flag"
    @if( $complete_flag ) checked='checked' @endif
>