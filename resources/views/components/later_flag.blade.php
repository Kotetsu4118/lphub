<label for="{{ Auth::user()->id }}">後でフラグ</label>
<input type="checkbox" value='{{ Auth::user()->id }}' id="{{ Auth::user()->id }}" name="later_flag"
    @if( $later_flag ) checked='checked' @endif
>