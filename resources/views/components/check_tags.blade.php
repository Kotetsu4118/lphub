<div>
    @foreach($tags as $tag)
      <input type="checkbox" value='{{ $tag->id }}' id="{{ $tag->id }}" name="tags[]"
          @if(is_array(old('tags')) && in_array($tag->id, old('tags')) ) checked='checked' 
          @elseif( is_array($checked_tag) && in_array($tag->id, $checked_tag) ) checked='checked'
          @endif
      >
      <label for="{{ $tag->id }}" class='pr-4' >{{ $tag->name }}</label>
      
    @endforeach
</div>

