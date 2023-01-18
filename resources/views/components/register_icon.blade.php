$default_icon = 
@props(['icon'=>$default_icon])

<input type="file" id='icon' name="user_icon">
{{-- jsで動的に表示を変えたい --}}
<div>
    <img src={{ $icon }}
</div>