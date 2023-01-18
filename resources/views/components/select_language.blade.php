<div class="form-group">
  
  <label for="select_language"></label>
  <select class="form-control" id="select_language" name='language_id'>
      
      
      @if($selected !=NULL && old('language_id') == NULL)
        <option hidden selected value='{{ $selected->id }}'>{{ $selected->name }}</option>
      @else
        <option hidden selected value=>言語を選択</option>
      @endif
      
      
      @foreach($languages as $language)
        <option value='{{ $language->id }}' @if( old('language_id') == $language->id) selected @endif>{{$language->name}}</option>
      @endforeach
  </select>

</div>